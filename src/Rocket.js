function Rocket() {

    return (
        <div className='space-container'>
            <div className='rocket-animation'>
                <main className='container'>
                    <div className='rocket'>
                        <div className='window'></div>
                    </div>
                    <div className='fin-left fin'></div>
                    <div className='fin-right fin'></div>
                    <div className='Propeller'></div>
                    <div className="fire">
                        <div className="orange"></div>
                        <div className="yellow"></div>
                    </div>
                </main>
            </div>
            <div className="stars"></div>
            <div className="twinkling"></div>
        </div>
    )
}

export default Rocket