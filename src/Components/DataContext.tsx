import * as React from "react";

interface DataContextType{
    data: string;
    setData:React.Dispatch<React.SetStateAction<any>>;
}

export const DataContext = React.createContext<DataContextType>({
    data: "",
    setData: () => {}
})