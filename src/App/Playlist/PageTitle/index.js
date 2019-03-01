import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

const PageTitle = ({ title }) => (
  <Helmet>
    <title>{title || 'Beaut'}</title>
  </Helmet>
)

PageTitle.propTypes = {
  title: PropTypes.string
}

export default PageTitle
