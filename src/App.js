import React from 'react';
import { hot } from 'react-hot-loader';
import './styles/main.scss';
import {Route, Switch} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import ScrollToTop from 'react-scroll-up';

import {routeParamsBuilder, routeBuilder} from './shared/Routing';
import ServiceFactory from './services/ServiceFactory';
import Search from './Search';
import Header from './Header';
import NavBar from './NavBar';
import MainPage from './main/MainPage';
import PeersPage from './peers/PeersPage';
import NodesPage from './nodes/NodesPage';
import BlocksPage from './blocks/BlocksPage';
import SingleBlockPage from './blocks/SingleBlockPage';
import SingleTransactionPage from './transactions/SingleTransactionPage';
import SingleAddressPage from './addresses/SingleAddressPage';
import SingleAliasPage from './aliases/SingleAliasPage';
import SingleAssetPage from './assets/SingleAssetPage';
import FaucetPage from './faucet/FaucetPage';

const routeParams = routeParamsBuilder(ServiceFactory.global().configurationService().all());
const routes = routeBuilder(routeParams.networkId);

ServiceFactory.global().analyticsService().initialize();

const withNetworkRouter = (RootComponent) => {
    return class extends React.Component {
        render() {
            return (
                <Router>
                    <Switch>
                        <Route path={routes.root} component={RootComponent} />
                    </Switch>
                </Router>
            );
        }
    };
};

class App extends React.Component {
    state = {
        mobileMenuVisible: null
    };

    handleMobileMenuToggle = () => {
        this.setState({mobileMenuVisible: !this.state.mobileMenuVisible});
    };

    render() {
        const isVisible = this.state.mobileMenuVisible;
        const isAnimated = isVisible != null;
        let wrapperClassName = 'wrapper' + (isVisible ? ' show' : '') + (isAnimated ? ' animated' : '');

        return (
            <React.Fragment>
                <div className={wrapperClassName}>
                    <Header onMenuToggle={this.handleMobileMenuToggle}>
                        <Search />
                    </Header>
                    <div className="container grid">
                        <NavBar />
                        <Switch>
                            <Route exact path={routes.blocks.one(routeParams.blockHeight)} component={SingleBlockPage} />
                            <Route exact path={routes.blocks.list} component={BlocksPage} />
                            <Route exact path={routes.transactions.one(routeParams.transactionId)} component={SingleTransactionPage} />
                            <Route exact path={routes.addresses.one(routeParams.address)} component={SingleAddressPage} />
                            <Route exact path={routes.aliases.one(routeParams.alias)} component={SingleAliasPage} />
                            <Route exact path={routes.assets.one(routeParams.assetId)} component={SingleAssetPage} />
                            <Route path={routes.nodes.list} component={NodesPage} />
                            <Route path={routes.peers.list} component={PeersPage} />
                            <Route exact path={routes.faucet} component={FaucetPage} />
                            <Route path={routes.root} component={MainPage} />
                        </Switch>
                    </div>
                    <div className="fading" onClick={this.handleMobileMenuToggle}></div>
                </div>
                <div className="mobile-menu">
                    <Header onMenuToggle={this.handleMobileMenuToggle} />
                    <NavBar appearance="mobile" onAfterNavigate={this.handleMobileMenuToggle} />
                </div>
                <ScrollToTop showUnder={100}>
                    <div className="scroll-button"></div>
                </ScrollToTop>
            </React.Fragment>
        );
    }
}

export default hot(module)(withNetworkRouter(App));
