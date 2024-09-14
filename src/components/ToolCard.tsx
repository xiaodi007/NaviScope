import React from 'react';
import { Link } from 'react-router-dom';

type ToolCardProps = {
  title: string;
  description: string;
  link: string;
};

export const ToolCard: React.FC<ToolCardProps> = ({ title, description, link }) => {
  return (
    <div className="tool-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={link}>
        <button>进入工具</button>
      </Link>
    </div>
  );
};
