import { ILabResult } from "../../../types";

export interface ILabResultItem {
    labResult: ILabResult;
}

export const LabResultItem = ({labResult}: ILabResultItem) => {
    const excludeFields = ['patient_id']

    return (
        <div>
            <ul>
                {Object.entries(labResult)
                  .filter(([key]) => !excludeFields.includes(key))
                  .map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {value}
                    </li>
                ))}
            </ul>
        </div>
    );
};