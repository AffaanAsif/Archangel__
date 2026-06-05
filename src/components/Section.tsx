import React from 'react';
import { motion } from 'motion/react';

export const Section = ({ children, className = '', ...props }: any) => {
   return (
     <motion.section
       initial={{ opacity: 0, y: 30 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, margin: "-100px" }}
       transition={{ duration: 0.6 }}
       className={`py-[100px] md:py-[140px] px-6 max-w-[1200px] mx-auto w-full ${className}`}
       {...props}
     >
       {children}
     </motion.section>
   );
};
