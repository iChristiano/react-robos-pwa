import React from 'react';
import { connect } from 'react-redux'; 
import { setSearchField, requestRobots, setSelectedRobot, updateModal, setSwInit, setSwUpdate, updateOnline } from '../../actions';
import MainPage from '../../pages/MainPage';
import './App.css';
import Alert from '../../components/alert/Alert';
import { SW_INIT, SW_UPDATE } from '../../constants';

const mapStateToProps = (state) => {
    return {
        searchField: state.searchReducer.searchField,
        robots: state.requestReducer.robots,
        isPending: state.requestReducer.isPending,
        error: state.requestReducer.error,
        selectedRobot: state.selectedRobotReducer.selectedRobot,
        modal: state.modalReducer.modal,
        serviceWorkerInitialized: state.serviceWorkerReducer.serviceWorkerInitialized,
        serviceWorkerUpdated: state.serviceWorkerReducer.serviceWorkerUpdated,
        serviceWorkerRegistration: state.serviceWorkerReducer.serviceWorkerRegistration,
        isOnline: state.onlineReducer.isOnline
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => {
            dispatch(setSearchField(event.target.value))
        },
        onRequestRobots: () => dispatch(requestRobots()),
        onSelectedRobotChange: (selectedRobot) => {
            dispatch(setSelectedRobot(selectedRobot))
            dispatch(updateModal(true))
        },
        closeModal: (modal) => {
            dispatch(updateModal(modal))
        },
        setOnline: () => {
            dispatch(updateOnline(true));
            dispatch(setSwUpdate());
        },
        setOffline: () => {
            dispatch(updateOnline(false))
        }
    };
};



class App extends React.Component {

    // Register the event listeners
    componentDidMount() {
        window.addEventListener('offline', this.props.setOffline);
        window.addEventListener('online', this.props.setOnline);
        // cleanup if we unmount
        return () => {
            window.removeEventListener('offline', this.props.setOffline);
            window.removeEventListener('online', this.props.setOnline);
        }
    }

    render(){
        const { serviceWorkerInitialized, serviceWorkerUpdated, serviceWorkerRegistration, isOnline } = this.props;

        const updateServiceWorker = () => {
            if (serviceWorkerRegistration && serviceWorkerRegistration.waiting) {
                serviceWorkerRegistration.waiting.postMessage({ type: 'SKIP_WAITING' });
                serviceWorkerRegistration.waiting.addEventListener('statechange', e => {
                    if (e.target.state === 'activated') {
                        window.location.reload();
                    }
                });
            } else {
                navigator.serviceWorker.getRegistrations()
                    .then((registrations) => { 
                        for(let registration of registrations) { 
                            registration.unregister();
                        } 
                    }).then(() => {
                        window.location.reload(true);
                    }); 
            }
        };

        return(
        <div>
            <div className="App-alert">
            {
                serviceWorkerInitialized && (
                <Alert text="Page has been saved for offline use." type={SW_INIT} />)
            }
            {
                serviceWorkerUpdated && (
                <Alert
                    text="There is a new version available."
                    buttonText="Update"
                    type={SW_UPDATE}
                    onClick={updateServiceWorker}
                />)
            }
            </div>
            {
                (isOnline) ? <p className="tr white pr2">&#x1F4F6; online (go offline)</p> : <p className="tr white pr2">{'\u274C'} offline</p>
            }
            <MainPage { ...this.props } />
            
        </div>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);