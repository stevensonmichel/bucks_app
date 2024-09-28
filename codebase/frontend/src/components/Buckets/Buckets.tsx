import React from "react";


const Buckets: React.FC = () => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Buckets</th>
                        <th>Amount</th>
                        <th>Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>bucket.name</td>
                        <td>bucket.amount</td>
                        <td>bucket.remaining</td>
                        <td>bucket.status</td>
                    </tr>
                </tbody>

            </table>

        
        </div>
    );
};

export default Buckets