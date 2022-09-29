export interface Size {
    width: number
    height: number
}

export interface Session {
    name: string
    date: Date
    excercises: Excercise[]
}

interface Excercise {
    name: string
    sets: Sets
    reps: number
    recoverTime: number
}

interface Sets {
    total: number
    completed: number
}