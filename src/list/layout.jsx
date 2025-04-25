import React from 'react';
import { TaskProvider } from './context/TaskContext';

const ListLayout = ({children}) => {
    return ( 
        <TaskProvider>
            <div>
                {children}
            </div>
        </TaskProvider>
     );
}
 
export default ListLayout;