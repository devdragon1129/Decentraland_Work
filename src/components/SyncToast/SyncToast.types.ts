import { Dispatch } from 'redux'
import { retrySync, RetrySyncAction } from 'modules/sync/actions'
import { dismissSyncedToast, dismissSignInToast, DismissSyncedToastAction, DismissSignInToastAction } from 'modules/ui/dashboard/actions'
import { openModal, OpenModalAction } from 'modules/modal/actions'
import { Project } from 'modules/project/types'
import { CallHistoryMethodAction } from 'connected-react-router'

export type Props = {
  syncCount: number
  errorCount: number
  projectCount: number
  projects: Project[]
  isLoggedIn: boolean
  didDismissSignInToast: boolean
  didDismissSyncedToast: boolean
  onRetry: typeof retrySync
  onOpenModal: typeof openModal
  onDismissSyncedToast: typeof dismissSyncedToast
  onDismissSignInToast: typeof dismissSignInToast
  onNavigate: (path: string) => void
}

export type State = {
  isSynced: boolean
}

export type MapStateProps = Pick<
  Props,
  'syncCount' | 'errorCount' | 'projectCount' | 'isLoggedIn' | 'didDismissSignInToast' | 'didDismissSyncedToast' | 'projects'
>
export type MapDispatchProps = Pick<Props, 'onRetry' | 'onOpenModal' | 'onDismissSyncedToast' | 'onDismissSignInToast' | 'onNavigate'>
export type MapDispatch = Dispatch<RetrySyncAction | OpenModalAction | DismissSyncedToastAction | DismissSignInToastAction | CallHistoryMethodAction>
