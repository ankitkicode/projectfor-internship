import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Artwork } from '../types/Artwork';
import { useSelectionStore } from '../store/SelectionStore';

const ArtTable: React.FC = () => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage] = useState<number>(10);

    const { selectedArtworks, setSelectedArtworks } = useSelectionStore();

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [numRowsToSelect, setNumRowsToSelect] = useState<number>(0);

    const fetchData = async (pageNumber: number = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${pageNumber}`);
            setArtworks(response.data.data);
            setTotalRecords(response.data.pagination.total);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page + 1);
    }, [page]);

    const onSelectionChange = (e: DataTableSelectionChangeEvent<Artwork[]>) => {
        setSelectedArtworks(e.value);
    };

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setPage(event.page);
    };

    const handleModalSubmit = () => {
        const selectedRows = artworks.slice(0, numRowsToSelect);
        setSelectedArtworks(selectedRows);
        setIsModalVisible(false);
    };

    return (
        <div>
            <Button label="Select Rows" onClick={() => setIsModalVisible(true)} />
            
            <DataTable
                value={artworks}
                lazy
                rows={rowsPerPage}
                totalRecords={totalRecords}
                loading={loading}
                selection={selectedArtworks}
                onSelectionChange={onSelectionChange}
                selectionMode="checkbox"
            >
                <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
                <Column field="title" header="Title"></Column>
                <Column field="place_of_origin" header="Place of Origin"></Column>
                <Column field="artist_display" header="Artist"></Column>
                <Column field="inscriptions" header="Inscriptions"></Column>
                <Column field="date_start" header="Date Start"></Column>
                <Column field="date_end" header="Date End"></Column>
            </DataTable>
            
            <Paginator
                first={page * rowsPerPage}
                rows={rowsPerPage}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                template="PrevPageLink PageLinks NextPageLink"
            />

            <Dialog header="Select Rows" visible={isModalVisible} onHide={() => setIsModalVisible(false)}>
                <div className="p-field">
                    <label htmlFor="numRows">Number of rows to select:</label>
                    <InputNumber
                        id="numRows"
                        value={numRowsToSelect}
                        onValueChange={(e) => setNumRowsToSelect(e.value ?? 0)}
                        min={0}
                        max={artworks.length}
                    />
                </div>
                <Button label="Submit" onClick={handleModalSubmit} />
            </Dialog>
        </div>
    );
};

export default ArtTable;
