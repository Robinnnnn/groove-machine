import React from 'react'
import { ReactComponent as Computer } from './icons/computer.svg'
import { ReactComponent as Tablet } from './icons/tablet.svg'
import { ReactComponent as Smartphone } from './icons/smartphone.svg'
import { ReactComponent as TV } from './icons/tv.svg'
import { ReactComponent as Speaker } from './icons/speaker.svg'
import './DevicesList.scss'

const getDeviceIcon = name => {
  switch (name) {
    case 'Computer':
      return Computer
    case 'Tablet':
      return Tablet
    case 'Smartphone':
      return Smartphone
    case 'TV':
      return TV
    case 'Speaker':
    default:
      return Speaker
  }
}

const DevicesList = ({ visible, devices }) => {
  const visibleClass = visible ? 'visible' : ''
  let colorIdx = 0
  const highlightColors = ['#ffdca2', '#f2a2f0', '#8cecee']
  const getHighlightColor = () =>
    highlightColors[colorIdx++ % highlightColors.length]

  return (
    <>
      <div className={`devices-horizontal-rule ${visibleClass}`} />
      <div className={`devices-list ${visibleClass}`}>
        {devices
          .sort((a, b) => (a.type < b.type ? -1 : a.type > b.type ? 1 : 0))
          .map(d => {
            const DeviceType = getDeviceIcon(d.type)
            const activeClass = d.is_active ? 'active' : 'inactive'
            return (
              <div className={`device ${activeClass}`} key={d.id}>
                <div
                  className='highlighter'
                  style={{ background: !d.is_active && getHighlightColor() }}
                />
                <div className='device-dot' />
                <div className='device-type'>
                  <DeviceType className='device-icon' />
                </div>
                <div className='device-name'>{d.name}</div>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default DevicesList
