import * as React from 'react'

const TaxButton = (props: {onClick: () => void}) => (
  <button {...props} children="TAX" />
)

export default TaxButton
