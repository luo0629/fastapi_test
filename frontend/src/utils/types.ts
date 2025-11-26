
export interface Challenge {
  id: number;                    
  difficulty: string;            
  title: string;                
  options: string[] | string;   
  correct_answer_id: number;     
  explanation: string;          
  timestamp: string;             
}