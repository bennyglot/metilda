import { Outlet, useNavigate } from "react-router-dom";
import { Table } from "../../components/table/Table";
import { usePatients } from "./usePatients";
import "./patients.css"; // Add a CSS file for styles

export const Patients = () => {
    const { patients } = usePatients();
    const navigate = useNavigate();

    return (
        <div className="patients-labresults-container">
            <div className="patients-table">
                <Table
                    data={patients}
                    onRowClick={(row) => {
                        navigate(`/patients/${row.patient_id}`);
                    }}
                />
            </div>
            <div className="labresults-panel">
                <Outlet />
            </div>
        </div>
    );
};