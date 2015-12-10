import React, { PropTypes } from 'react';

class AdminPage extends React.Component {
    render () {
        return (
            <div>
                <h1 className="page-title">Admin</h1>
                <div className="grid">
                    <div className="grid__item one-half">
                        <div className="asset-data">
                            <div className="asset-data__header">
                                <span className="asset-data__title">Configuratie gebruikers en gebruikersgroepen</span>
                            </div>
                            <div className="asset-data__content">
                                <p>
                                    <a href={`${ADMINURL}/admin/Users/ViewRights.aspx`} target="_blank">Rights to users </a> <br/>
                                    Give rights to users
                                </p>
                            </div>
                        </div>
                        <div className="asset-data">
                            <div className="asset-data__header">
                                <span className="asset-data__title">Data manipulations</span>
                            </div>
                            <div className="asset-data__content">
                                <p>
                                    <a href={`${ADMINURL}/admin/Import/Default.aspx`} target="_blank">Import</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/Export/Default.aspx`} target="_blank">Export</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/Synk/Default.aspx`} target="_blank">Synchronisation</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid__item one-half">
                        <div className="asset-data">
                            <div className="asset-data__header">
                                <span className="asset-data__title">Application configuration and settings</span>
                            </div>
                            <div className="asset-data__content">
                                <p>
                                    <a href={`${ADMINURL}/admin/Batch/Default.aspx`} target="_blank">Batch System</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/Download/InventScannerInstallation.msi`} target="_blank">InventScanner</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/Download/StockScannerInstallation.msi`} target="_blank">StockScanner</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/Search/Default.aspx`} target="_blank">Search settings</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/LocationMove.aspx`} target="_blank">Location movement</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/ZipsAndPlaces.aspx`} target="_blank">Zipcode and places</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/ServiceOps.aspx`} target="_blank">Service operations</a><br/>
                                    Additional service operations for reindexing search, monitoring cache
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default AdminPage;
