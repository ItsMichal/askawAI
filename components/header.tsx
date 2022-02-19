import { Component } from "react";

export const Header= () => {
    return (<>
        <h1 className={"text-center text-5xl font-bold pt-5 text-white"}>AskawAI</h1>
        <h2 className="font-thin text-md text-center text-white mb-2">/askˈəˈwā/ - Ask away!</h2>
        <p className={"text-white text-center"}>The AI-powered teacher assistant</p>
    </>);
}

export default Header