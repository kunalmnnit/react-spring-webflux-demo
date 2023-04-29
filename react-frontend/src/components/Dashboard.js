import React, { useEffect, useState } from 'react'


export const Dashboard = () => {

    const [listening, setListening] = useState(false);
    const [cpuUsage, setcpuUsage] = useState(0);
    const [memoryUsage, setmemoryUsage] = useState(0);

    let eventSource = undefined;


    useEffect(() => {
        if (!listening) {
            eventSource = new EventSource("http://localhost:8080/event/resources/usage");
            eventSource.onmessage = (event) => {
                const usage = JSON.parse(event.data);
                setcpuUsage(usage.cpuUsage)
                setmemoryUsage(usage.memoryUsage)
            }
            eventSource.onerror = (err) => {
                console.error("EventSource failed:", err);
                eventSource.close();
            }
            setListening(true)
        }
        return () => {
                eventSource.close();
                console.log("event closed")
        }

    }, [])

    return (
        <div style={{ "marginTop": "20px", "textAlign": "center" }}>

            <div style={{ "display": "inline-flex" }}>
                <div style={{"margin":"50px"}}>
                    <div>
                        {cpuUsage}
                    </div>

                </div>

                <div style={{"margin":"50px"}}>
                    <div>
                        {memoryUsage}
                    </div>
                </div>
            </div>

        </div>
    )
}
