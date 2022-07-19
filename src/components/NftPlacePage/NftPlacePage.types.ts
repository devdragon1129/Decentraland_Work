import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { Wallet } from 'decentraland-dapps/dist/modules/wallet/types'
import { Authorization } from 'modules/land/types'
import { SetUpdateManagerRequestAction, setUpdateManagerRequest } from 'modules/land/actions'
import { openModal, OpenModalAction } from 'modules/modal/actions'
import { Project } from 'modules/project/types'

export type DefaultProps = {
  projects: Project[]
}

export type State = {
  hasCopiedText: boolean
  managerAddress: string
  fileinfo: string
}

export type Props = DefaultProps & {
  wallet: Wallet | null
  authorizations: Authorization[]
  onNavigate: (path: string) => void
  onOpenModal: typeof openModal
  onSetUpdateManager: typeof setUpdateManagerRequest
}

export type MapStateProps = Pick<Props, 'projects' | 'wallet' | 'authorizations' >
export type MapDispatchProps = Pick<Props, 'onNavigate' | 'onSetUpdateManager' | 'onOpenModal'>
export type MapDispatch = Dispatch<SetUpdateManagerRequestAction | OpenModalAction | CallHistoryMethodAction>
