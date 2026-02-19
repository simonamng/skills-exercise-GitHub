import React, { useEffect, useState } from 'react';
import CommonTable from './CommonTable';

export default function Activities() {
  const [items, setItems] = useState([]);
  const [modalContent, setModalContent] = useState(null);

  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  const fetchData = () => {
    console.log('Fetching Activities from', endpoint);
    fetch(endpoint)
      .then((r) => r.json())
      .then((data) => {
        console.log('Activities fetch data:', data);
        const payload = Array.isArray(data) ? data : data.results ?? [];
        setItems(payload);
      })
      .catch((err) => console.error('Activities fetch error', err));
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div>
      <CommonTable title="Activities" items={items} endpoint={endpoint} onRefresh={fetchData} onShowDetails={(d) => setModalContent(d)} />

      {modalContent && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activity Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setModalContent(null)} />
              </div>
              <div className="modal-body">
                <pre>{JSON.stringify(modalContent, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalContent(null)}>Close</button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
}
