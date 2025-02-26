export interface Task {
    id: number;
    issueDate: string; // Date
    priority: "Low" | "Medium" | "High"; // Enumeration
    status: "To do" | "In Progress" | "Completed" | "Cancelled"; // Enumeration
    tobeCompletedDate?: string | null; // Date
    actualCompleteDate?: string | null; // Date
    issueDescription: string; // Text
    notes?: string; // Text
    customer?: {
      id: number;
     name: string;
      email: string;
    }; // Relation with User2
    resolver?: {
      id: number;
      username: string;
    }; // Relation with User (from users-permissions)
    comments?: {
      id: number;
      content: string;
    }[]; // Relation with Comment
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
  }
  
  export interface User2 {
    id: number;
    name: string;
    email: string;
    phone_number?: string;
  }