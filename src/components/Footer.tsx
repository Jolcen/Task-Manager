type FooterProps = {
  totalTasks: number;
  completedTasks: number;
};

function Footer({ totalTasks, completedTasks }: FooterProps) {
  const pendingTasks = totalTasks - completedTasks;

  return (
    <footer className="footer">
      <span>Total: <strong>{totalTasks}</strong></span>
      <span>Completadas: <strong>{completedTasks}</strong></span>
      <span>Pendientes: <strong>{pendingTasks}</strong></span>
    </footer>
  );
}

export default Footer;