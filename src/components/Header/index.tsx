import React, { useCallback, useMemo } from 'react'
import { remote } from 'electron'
import os from 'os'
import { FiX, FiMinus, FiMaximize2 } from 'react-icons/fi'

import { Container, WindowActions, MacActionButton, DefaultActionButton } from './styles'

const Header: React.FC = () => {
  const handleCloseWindow = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.close()
  }, [])

  const handleMaximize = useCallback(() => {
    const window = remote.getCurrentWindow()

    if (!window.isMaximized()) {
      window.maximize()
    } else {
      window.unmaximize()
    }
  }, [])

  const handleMinimize = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.minimize()
  }, [])

  const isMacOS = useMemo(() => os.platform() === 'darwin', [])

  return (
    <Container>
      <strong>Rocket Redis</strong>

      {isMacOS ? (
        <WindowActions position="left">
          <MacActionButton color="close" onClick={handleCloseWindow}>
            <FiX />
          </MacActionButton>
          <MacActionButton color="minimize" onClick={handleMinimize}>
            <FiMinus />
          </MacActionButton>
          <MacActionButton color="maximize" onClick={handleMaximize}>
            <FiMaximize2 />
          </MacActionButton>
        </WindowActions>
      ) : (
        <WindowActions position="right">
          <DefaultActionButton onClick={handleMinimize}>
            <FiMinus />
          </DefaultActionButton>
          <DefaultActionButton onClick={handleMaximize}>
            <FiMaximize2 />
          </DefaultActionButton>
          <DefaultActionButton onClick={handleCloseWindow}>
            <FiX />
          </DefaultActionButton>
        </WindowActions>
      )}
    </Container>
  )
}

export default Header