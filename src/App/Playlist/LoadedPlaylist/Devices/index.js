import React, { Component } from 'react'
import { SpotifyContext } from 'Contexts/index'
import { log } from 'util/index'
import List from './List'
import './Devices.scss'

class Devices extends Component {
  static contextType = SpotifyContext

  state = {
    devices: [],
    activeDeviceID: null,
    intervalID: '',
    isOverriding: false
  }

  async componentDidMount() {
    this.setDeviceList(true)
  }

  componentDidUpdate(prevProps) {
    const mounted = !prevProps.visible && this.props.visible
    const unmounted = prevProps.visible && !this.props.visible
    if (mounted) {
      this.setDeviceList(false)
      const intervalID = setInterval(() => this.setDeviceList(false), 1000)
      this.setState({ intervalID })
      return
    }
    if (unmounted) {
      clearInterval(this.state.intervalID)
      return
    }
  }

  setDevice = async (deviceID, devices = this.state.devices) => {
    const {
      state: { spotify }
    } = this.context
    const { activeDeviceID } = this.state

    // Disable unnecessary server request
    if (deviceID === activeDeviceID) return

    // Instantly select device on client
    const newDevices = devices.slice().map(d => {
      const device = { ...d, is_active: false }
      if (device.id === deviceID) device.is_active = true
      return device
    })
    this.setState({
      isOverriding: true,
      devices: newDevices,
      activeDeviceID: deviceID
    })

    log('info', `transferring playback: ${deviceID}`)
    await spotify.transferMyPlayback([deviceID])
  }

  setDeviceList = async defaultSelect => {
    const {
      state: { spotify }
    } = this.context
    const { isOverriding, activeDeviceID } = this.state
    const { devices } = await spotify.getMyDevices()
    const activeDevice = devices.find(d => d.is_active)
    const serverActiveDeviceID = activeDevice && activeDevice.id

    // Handle race condition where async call returns an outdated device
    if (isOverriding && serverActiveDeviceID !== activeDeviceID) return

    const noActiveDevice = !devices.reduce((v, d) => v || d.is_active, false)
    // If no active device is detected, select the current browser by default
    if (noActiveDevice && defaultSelect) {
      const {
        state: { currentDeviceID }
      } = this.context
      log(
        'info',
        `no active device detected. Selecting current browser as active device: ${currentDeviceID}`
      )
      this.setDevice(currentDeviceID, devices)
      return
    }
    this.setState({
      devices,
      activeDeviceID: serverActiveDeviceID
    })
  }

  render() {
    const { visible } = this.props
    const { devices } = this.state
    return (
      <div className='devices-container'>
        <List visible={visible} devices={devices} setDevice={this.setDevice} />
      </div>
    )
  }
}

export default Devices
