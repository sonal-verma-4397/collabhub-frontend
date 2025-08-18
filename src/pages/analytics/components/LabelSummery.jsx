import { STATUS_COLOR } from "../../../data/constants";

export default function LabelSummery({ statuses, tasks }) {
  function mapToStatus(status) {
    const filterByTasksByStatus = (task) => task.status === status.title;
    return (
      <div
        key={status.id}
        className="w-48 p-4 border border-slate-300 rounded-xl flex flex-col gap-4 justify-center items-center bg-white dark:bg-[#1c1c1e] shadow hover:shadow-lg transition-shadow duration-300"
      >
        <div
          className={`border-[6px] size-24 flex justify-center items-center rounded-full p-4 ${
            STATUS_COLOR[status.color]
          }`}
        >
          <span className="text-4xl font-bold">
            {tasks.filter(filterByTasksByStatus).length}
          </span>
        </div>
        <span className="text-lg font-medium text-center text-gray-700 dark:text-gray-300">
          {status.title}
        </span>
      </div>
    );
  }
  return (
    <section className="dark:bg-[#131416] bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
        Statuses
      </h2>
      <div className="flex flex-wrap gap-6">{statuses.map(mapToStatus)}</div>
    </section>
  );
}
