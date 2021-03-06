import React, {Component} from 'react';
import { MyStylesheet } from './styles'
import Design from './design'

class Landing extends Component  {

    constructor(props) {
        super(props);
        this.state = { render: '', width: 0, height: 0, navigation:false, activeslideid:false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
      }
      componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
        this.updateWindowDimensions();
      }
      componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
      }
      updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
      }

    showslide(slide) {
        const design = new Design();
        const styles = MyStylesheet();
        const smallslide = design.getsmallslide.call(this)
        const regularFont = design.getRegularFont.call(this)
        return(
        <div style={{...styles.generalFlex}}>
            <div style={{...styles.flex1}}>

        <div style={{...styles.generalContainer,...styles.showBorder,...smallslide,...styles.marginAuto}} onClick={()=>{this.setState({activeslideid:slide.id})}}>
            <img src={slide.url} alt={slide.title} style={{...smallslide}}  />
        </div>
        <div style={{...styles.generalContainer,...styles.marginAuto,...styles.alignCenter}} onClick={()=>{this.setState({activeslideid:slide.id})}}>
            <span style={{...styles.generalFont,...regularFont}}>{slide.title}</span>
        </div>


        </div>
        </div> )

    }

    showslides() {
        const design = new Design();
        const slides = design.getslides.call(this);
        const styles = MyStylesheet();
        const allslides = [];
        const landing = new Landing()
        if(slides) {
            // eslint-disable-next-line
            slides.map(slide=> {
                allslides.push(landing.showslide.call(this,slide))

            })
        }
        const templatecolumns = () => {
           
            if(this.state.width>800) {
            return (styles.triplegrid)
            } else {
                return (styles.doublegrid)
            }
        }
        
        return(<div style={{...styles.generalGrid,...templatecolumns(),...styles.bottomMargin15}}>
            {allslides}
        </div>)
        
        
    }

    render() {
        const design = new Design();
        const styles = MyStylesheet();
        const mainslide = design.getmainslide.call(this)
        const landing = new Landing();
        const headerFont = design.getHeaderFont.call(this)
        const regularFont = design.getRegularFont.call(this)

        const myslide = () => {
            if(this.state.activeslideid) {
            return(design.getslidebyid.call(this,this.state.activeslideid))
            } else {
                return false;
            }
        }
        const showmainslide = () => {
 
            if(myslide()) {
                return(<div style={{...styles.generalContainer,...styles.showBorder,...mainslide,...styles.marginAuto}}>
                    <img src={myslide().url} alt={myslide().title} style={{...mainslide}}  />
                </div> )
            }

        }
        const showmaintitle = () => {

            if(myslide()) {
                return(<span style={{...styles.generalFont,...headerFont}}>{myslide().title}</span>)
            }

        }

        const showmaincaption = () => {

            if(myslide()) {
                return(<span style={{...styles.generalFont,...regularFont}}>{myslide().caption}</span>)
            }

        }
        return (
            <div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1 }}>

                <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                          {showmaintitle()}

                        </div>
                    </div>


                    <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                          {showmainslide()}

                        </div>
                    </div>

                    <div style={{ ...styles.generalFlex,...styles.bottomMargin15 }}>
                        <div style={{ ...styles.flex1, ...styles.alignCenter }}>

                          {showmaincaption()}

                        </div>
                    </div>

                    {landing.showslides.call(this)}

                </div>
            </div>
        )
    }
}

export default Landing;