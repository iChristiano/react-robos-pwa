import React from 'react';
import SearchBox from '../components/searchbox/SearchBox';
import CardList from '../components/cardlist/CardList';
import Scroll from '../components/scroll/Scroll';
import ErrorBoundary from '../containers/errorboundary/ErrorBoundary';
import ModalCard from '../components/modalcard/ModalCard';

class MainPage extends React.Component {

    componentDidMount() {
        this.props.onRequestRobots();
    }

    render(){
        const { searchField, onSearchChange, robots, isPending, selectedRobot, onSelectedRobotChange, modal, closeModal, isOnline } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return (
        <div className='tc'>
            <h1 className='f1'>Robos PWA</h1>
            <SearchBox searchChange={onSearchChange} />
            <Scroll>
                {
                    (isOnline) || <p className="tc white">You are now in offline mode! This is a React Robots PWA-App, with minor optimized Lighthouse score.</p>
                }
                {
                    (!robots.length && isPending) ?
                    <h1 className='tc'>Loading...</h1>
                    :
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} onSelectedRobotChange={onSelectedRobotChange}/>
                    </ErrorBoundary>
                }
            </Scroll>
            <ModalCard selectedRobot={selectedRobot} closeModal={closeModal} modal={modal}/>
        </div>);
    }
}

export default MainPage;