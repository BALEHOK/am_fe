import React, { PropTypes } from 'react';
import L20nMessage from '../intl/l20n-message';

class AdminPage extends React.Component {
    render () {
        return (
            <div>
                <h1 className="page-title">{L20nMessage('adminTitle', 'Admin')}</h1>
                <div className="grid">
                    <div className="grid__item one-half">
                        <div className="asset-data">
                            <div className="asset-data__header">
                                <span className="asset-data__title">{L20nMessage('adminUserSection', 'Configuratie gebruikers en gebruikersgroepen')}</span>
                            </div>
                            <div className="asset-data__content">
                                <p>
                                    <a href={`${ADMINURL}/admin/Users/ViewRights.aspx`} target="_blank">{L20nMessage('adminUserRights', 'Rights to users')} </a> <br/>
                                    {L20nMessage('adminUserRightsText', 'Give rights to users')}
                                </p>
                            </div>
                        </div>
                        <div className="asset-data">
                            <div className="asset-data__header">
                                <span className="asset-data__title">{L20nMessage('adminDataSection', 'Data manipulations')}</span>
                            </div>
                            <div className="asset-data__content">
                                <p>
                                    <a href={`${ADMINURL}/admin/Import/Default.aspx`} target="_blank">{L20nMessage('adminImport', 'Import')}</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/Export/Default.aspx`} target="_blank">{L20nMessage('adminExport', 'Export')}</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/Synk/Default.aspx`} target="_blank">{L20nMessage('adminSync', 'Synchronisation')}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid__item one-half">
                        <div className="asset-data">
                            <div className="asset-data__header">
                                <span className="asset-data__title">{L20nMessage('adminAppSection', 'Application configuration and settings')}</span>
                            </div>
                            <div className="asset-data__content">
                                <p>
                                    <a href={`${ADMINURL}/admin/Batch/Default.aspx`} target="_blank">{L20nMessage('adminBatchSystem', 'Batch System')}</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/Download/InventScannerInstallation.msi`} target="_blank">{L20nMessage('adminInventScanner', 'InventScanner')}</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/Download/StockScannerInstallation.msi`} target="_blank">{L20nMessage('adminStockScanner', 'StockScanner')}</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/Search/Default.aspx`} target="_blank">{L20nMessage('adminSearchSettings', 'Search settings')}</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/LocationMove.aspx`} target="_blank">{L20nMessage('adminLocationMovement', 'Location movement')}</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/ZipsAndPlaces.aspx`} target="_blank">{L20nMessage('adminZipCodes', 'Zipcode and places')}</a>
                                </p>
                                <p>
                                    <a href={`${ADMINURL}/admin/ServiceOps.aspx`} target="_blank">{L20nMessage('adminServiceOps', 'Service operations')}</a><br/>
                                    {L20nMessage('adminServiceOpsText', 'Additional service operations for reindexing search, monitoring cache')}
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
