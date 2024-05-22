import { Button, ButtonProps } from '@mui/material'
import theme from '../../styles/theme'
import Link from '../common/Link'

const defaultProps = {
  variant: 'outlined',
  sx: { background: theme.palette.background.default },
  size: 'small',
  component: Link
} as const

const SimpleButton = (props: ButtonProps) => <Button {...defaultProps} {...props} />

export default SimpleButton
