import { Collapsable } from "../../components/collapsable/Collapsable";
import { LabResultItem } from "./LabResultItem/LabResultItem";
import { useLabResult } from "./useLabResult";

export const LabResults = () => {
    const {selectedPatient, loading} = useLabResult();
   
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
           {selectedPatient && selectedPatient?.lab_results.map((labResult, index) => (
                <Collapsable key={index} header={`Result Unit ${labResult.result_unit}`}>
                    <LabResultItem labResult={labResult} />
                </Collapsable>
            ))}
        </div>
    );
}