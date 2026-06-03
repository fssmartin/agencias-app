    
export const Patterns = {
  
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  
  password: /^(?=.*[A-Z])(?=.*\d).{6,}$/,

  phone: /^[0-9]{9}$/,

  dni: /^[0-9]{8}[A-Z]$/,

  onlyLetters: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,

  name: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,50}$/  // ✅ nombre con letras y espacios
};
