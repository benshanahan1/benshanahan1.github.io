import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Footer from './Footer';
import ProjectDescription from './ProjectDescription';

const theme = createMuiTheme({
    typography: {
        palette: {},
        fontFamily: '"Crimson Text", serif',
        // fontFamily: '"Open Sans", sans-serif',
        fontSize: 18,
        // fontWeightLight: 300,
        // fontWeightRegular: 400,
        // fontWeightMedium: 500,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        /* Bind methods to `this`. */
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    render() {
        const { width, height } = this.state;

        const isMobile = width < 650;  // rough estimate of mobile screen size
        const dimensions = { width, height, isMobile };

        const HomeView = props => (
            <div>
                <AboutMe dimensions={dimensions} />
                <Projects dimensions={dimensions} />
            </div>
        );

        return (
            <MuiThemeProvider theme={theme}>

                <Header dimensions={dimensions} />

                <BrowserRouter>
                    <Switch>
                        <Route
                            exact path='/:slug'
                            component={ProjectDescription}
                        />
                        <Route component={HomeView} />
                    </Switch>
                </BrowserRouter>

                <Footer dimensions={dimensions} />

            </MuiThemeProvider>
        );
    }
}

export default App;
