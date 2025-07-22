export interface Tasks {
    _id: string;
    status: 'completed' | 'in progress' | 'commenced';
    task_details: string;
}