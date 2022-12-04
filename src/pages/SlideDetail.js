import {Bar, BarChart, LabelList, ResponsiveContainer} from "recharts";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function SlideDetail({usrToken}) {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!usrToken) {
    //         navigate('/');
    //     }
    // }, []);

    const [data, setData] = useState([
        {name: "Page A", uv: 4000},
        {name: "Page B", uv: 3000},
        {name: "Page C", uv: 2000},
    ]);

    return (
        <div id="page-container">
            <div className="p-4" style={{height: 'fit-content'}}>
                <div className="bg-white p-4 h-100">
                    <div className="d-flex pt-2 justify-content-center">
                        <p>Go to <span style={{fontWeight: 'bold'}}>1312312</span> to play</p>
                    </div>
                    <div className="d-flex ps-4" style={{lineHeight: 1}}>
                        <p style={{fontSize: '30px', fontWeight: 'bold'}}>Multiple Choice</p>
                    </div>
                    <div className="d-flex justify-content-center" style={{height: '500px', width: '100%'}}>
                        <ResponsiveContainer width="90%" height="100%">
                            <BarChart width={150} height={40} data={data}
                                      margin={{top: 20, bottom: 20}}>
                                <Bar dataKey="uv"
                                     fill="#4c78dd">
                                    <LabelList dataKey="name"
                                               position="bottom"
                                               style={{fontWeight: "bold"}}/>
                                    <LabelList dataKey="uv" position="top" />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlideDetail;
