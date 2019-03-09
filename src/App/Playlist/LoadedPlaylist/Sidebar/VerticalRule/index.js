import React from 'react'
import './VerticalRule.scss'

const VerticalRule = ({ active }) => (
  <div className='vertical-rule-container'>
    <div className={`vertical-rule ${active ? 'active' : ''}`} />
  </div>
)

export default VerticalRule
