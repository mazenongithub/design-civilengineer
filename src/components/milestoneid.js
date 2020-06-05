import React from 'react';
import { MyStylesheet } from './styles'
import Design from './design'


class MilestoneID {
    loadmilestoneids() {
        const showmilestone = (milestone) => {
            return(<option key={milestone.milestoneid} value={milestone.milestoneid}>{milestone.milestone}</option>)
        }
        let ids = [];
        const design = new Design();
        const project = design.getprojectbytitle.call(this,this.props.match.params.title)
        if(project) {
            const projectid = project.projectid;
            const milestones = design.getmilestonesbyprojectid.call(this,projectid)
            if(milestones) {
                // eslint-disable-next-line
                milestones.map(milestone=>{
                    ids.push(showmilestone(milestone))
                    
                })
            }
        }
        return ids;
    }

    showmilestoneid(){
        const styles = MyStylesheet();
        const design = new Design();
        const regularFont = design.getRegularFont.call(this);
        const milestoneid = new MilestoneID();
        return(
    <div style={{...styles.generalContainer, ...styles.bottomMargin15}}>
        <div style={{...styles.generalContainer,...styles.generalContainer,...regularFont}}>MilestoneID</div>
            <select style={{...styles.generalFont,...regularFont}} 
            value={this.getmilestoneid()}
            onChange={event=>{this.handlemilestoneid.call(this,event.target.value)}}>
                <option value=""> Select A MilestoneID</option>
                {milestoneid.loadmilestoneids.call(this)}

            </select>
        </div>
        )
    }


}

export default MilestoneID;