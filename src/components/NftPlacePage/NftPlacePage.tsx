import * as React from 'react'
import { Props, State, DefaultProps } from './NftPlacePage.types'
import SyncToast from 'components/SyncToast'

export default class NftPlacePage extends React.PureComponent<Props, State> {
  timeoutId: NodeJS.Timer | null = null

  static defaultProps: DefaultProps = {
    projects: []
  }

  state: State = {
    hasCopiedText: false,
    managerAddress: '',
    fileinfo: ''
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ fileinfo: event.target.value })
    console.log("this is the test", this.state.fileinfo)
  }

  handleNext = async() => {
    await(this.props.onOpenModal('ImportModal'))
  }
  render() {
    const thumbnail = ''

    return (
      <>
        <div
        className="flex flex-col p-8 md:px-20 bg-white h-106 w-1/2 mx-auto"
        >
          <h1 className="text-center mb-6 font-bold text-2xl">
              Your NFT
          </h1>
          <SyncToast/>
          <div className="flex items-center justify-center bg-gray-200">
              <img src={thumbnail} alt="product image" style={{height:'400px', width:'400px'}}/>
          </div>
          <div >
            <button
              onClick={this.handleNext}
              style={{backgroundColor:'coral'}}
              className={
              " space-x-4  text-white font-medium rounded-full text-sm w-1/3 px-5 py-2.5 text-center " +
              " hover:ring-4 focus:outline-none focus:ring-blue-500"
              }
            >
              <p className="text-center">Place in Metaverse</p>
            </button>
          </div>
        </div>
      </>
    )
  }
}
