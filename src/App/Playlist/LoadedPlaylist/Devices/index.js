import React, { Component } from 'react'
import { SpotifyContext } from 'Contexts/index'
import List from './List'
import './Devices.scss'

class Devices extends Component {
  static contextType = SpotifyContext

  state = {
    devices: [],
    intervalId: '',
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
      const intervalId = setInterval(() => this.setDeviceList(false), 1000)
      this.setState({ intervalId })
      return
    }
    if (unmounted) {
      clearInterval(this.state.intervalId)
      return
    }
  }

  setDevice = async deviceId => {
    const { devices } = this.state
    const {
      state: { spotify }
    } = this.context

    // Instantly select device on client
    this.setState({ isOverriding: true })
    const newDevices = devices.slice().map(d => {
      const device = { ...d, is_active: false }
      if (device.id === deviceId) device.is_active = true
      return device
    })
    this.setState({ devices: newDevices })

    console.log('Transferring playback', deviceId)
    await spotify.transferMyPlayback([deviceId])

    this.setState({ isOverriding: false })
  }

  setDeviceList = async defaultSelect => {
    const {
      state: { spotify }
    } = this.context
    const { isOverriding } = this.state
    const { devices } = await spotify.getMyDevices()
    console.log('Retrieved devices', devices)

    // Handle race condition where async call returns an outdated device
    if (isOverriding) return

    const noActiveDevice = !devices.reduce((v, d) => v || d.is_active, false)
    // If no active device is detected, select the current browser by default
    if (noActiveDevice && defaultSelect) {
      const {
        state: { currentDeviceId }
      } = this.context
      console.log(
        'No active device detected. Selecting current browser as active device.',
        currentDeviceId
      )
      this.setDevice(currentDeviceId)
    }
    this.setState({ devices })
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
