import React, { Component, PropTypes } from 'react'


class Page extends Component {
    constructor(params) {
        super(params)
        this.state = {
            alertContent  : '',
            handleContent : '',
            loadingContent: ''
        }
    }

    // 此方法需要重写
    pageView(){

    }

    render () {
        return (
            <div>

                {this.pageView()}
                 <AlertModal ref={(ref)=> this.alertModal = ref} content={this.state.alertContent}/>
				 <HandleModal ref={(ref)=> this.handleModal = ref} title={this.state.handleTitle} content={ this.state.handleContent}/>
				 <LoadingModal ref={(ref)=> this.loadingModal = ref} />
            </div>
        )
    }



    openAlert(data){
        this.setState({
            alertContent:data
        })
        this.alertModal._setModalVisible(true) 
    }

    openHandle(title,data,callback){
        this.setState({
            handleTitle:title,
            handleContent:data,
        })
        this.handleModal.open(callback)
    }

    openLoading(){
        this.loadingModal._setModalVisible(true)
    }
    closeLoading(){
        this.loadingModal._setModalVisible(false)
    }
}


Page.propTypes = {

}

export default Page;