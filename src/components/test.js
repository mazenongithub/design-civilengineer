getlabortotal() {

}
getmaterialtotal() {

}

getequipmenttotal() {

}
getitemtotal() {

}
showlinedetail() {
    const design = new Design();
    const styles = MyStylesheet();
    const regularFont = design.getRegularFont.call(this);
    const totallabor = `$${Number(this.getlabortotal()).toFixed(2)}`
    const totalmaterials = `$${Number(this.getmaterialtotal()).toFixed(2)}`
    const totalequipment = `$${Number(this.getequipmenttotal()).toFixed(2)}`
    const totalamount = `$${Number(this.getitemtotal()).toFixed(2)}`
 
        if (this.state.width > 800) {
            return (<div style={{ ...styles.generalFlex }}>
                <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Labor
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getlaboritems()}
                            </div>


                        </div>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Materials
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getmaterialitems()}
                            </div>

                        </div>
                    </div>
                    <div style={{ ...styles.generalFlex }}>
                        <div style={{ ...styles.flex1 }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Equipment
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getequipmentitems()}
                            </div>


                        </div>
                        <div style={{ ...styles.flex1, ...styles.showBorder }}>

                            <div style={{ ...styles.generalContainer }}>
                                Total Labor {totallabor}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total Materials {totalmaterials}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total Equipment {totalequipment}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total {totalamount}
                            </div>




                        </div>
                    </div>


                </div>
            </div>)

        } else {
            return (
                <div style={{ ...styles.generalFlex }}>
                    <div style={{ ...styles.flex1, ...styles.generalFont, ...regularFont }}>

                        <div style={{ ...styles.generalContainer }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Labor
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getlaboritems()}
                            </div>

                        </div>

                        <div style={{ ...styles.generalContainer }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Materials
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getmaterialitems()}
                            </div>


                        </div>
                        <div style={{ ...styles.generalContainer }}>

                            <div style={{ ...styles.generalContainer, ...styles.showBorder, ...styles.alignCenter }}>
                                Equipment
                            </div>
                            <div style={{ ...styles.generalContainer, ...styles.showBorder }}>
                                {this.getequipmentitems()}
                            </div>

                        </div>
                        <div style={{ ...styles.generalContainer }}>
                            <div style={{ ...styles.generalContainer }}>
                                Total Labor {totallabor}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total Materials {totalmaterials}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total Equipment {totalequipment}
                            </div>
                            <div style={{ ...styles.generalContainer }}>
                                Total {totalamount}
                            </div>
                        </div>


                    </div>
                </div>
            )

        
    }
 

}
