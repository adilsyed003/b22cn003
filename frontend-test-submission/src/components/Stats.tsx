import { useEffect, useState } from "react";

type Link = {
  shortCode: string;
  original: string;
  expiry: string;
  usage: number;
  status: string;
};
type Stats = {
  total: number;
  active: number;
  expired: number;
  links: Link[];
};
import { getStats } from "../api";

const Stats = () => {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const data = await getStats();
      setStats(data);
    }
    fetchStats();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 mx-2">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          URL Stats
        </h2>
        {stats ? (
          <div>
            <div className="flex flex-col md:flex-row gap-6 mb-8 justify-center">
              <div className="bg-gray-200 rounded-lg p-6 flex-1 text-center">
                <div className="text-lg text-gray-600">Total URLs</div>
                <div className="text-2xl font-bold">{stats.total}</div>
              </div>
              <div className="bg-green-100 rounded-lg p-6 flex-1 text-center">
                <div className="text-lg text-green-700">Active URLs</div>
                <div className="text-2xl font-bold">{stats.active}</div>
              </div>
              <div className="bg-red-100 rounded-lg p-6 flex-1 text-center">
                <div className="text-lg text-red-700">Expired URLs</div>
                <div className="text-2xl font-bold">{stats.expired}</div>
              </div>
            </div>
            <h3 className="mt-8 mb-4 text-xl text-blue-700 font-semibold text-center">
              All Links
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg text-base">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2 font-semibold">
                      Short URL
                    </th>
                    <th className="border px-4 py-2 font-semibold">
                      Original URL
                    </th>
                    <th className="border px-4 py-2 font-semibold">Expiry</th>
                    <th className="border px-4 py-2 font-semibold">Usage</th>
                    <th className="border px-4 py-2 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.links.map((link) => (
                    <tr
                      key={link.shortCode}
                      className={
                        link.status === "expired" ? "bg-red-50" : "bg-green-50"
                      }
                    >
                      <td className="border px-4 py-2">
                        <a
                          href={`/${link.shortCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline font-medium"
                        >
                          {window.location.origin + "/" + link.shortCode}
                        </a>
                      </td>
                      <td className="border px-4 py-2 break-all">
                        {link.original}
                      </td>
                      <td className="border px-4 py-2">
                        {new Date(link.expiry).toLocaleString()}
                      </td>
                      <td className="border px-4 py-2">{link.usage}</td>
                      <td
                        className={
                          "border px-4 py-2 font-bold " +
                          (link.status === "expired"
                            ? "text-red-600"
                            : "text-green-700")
                        }
                      >
                        {link.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-lg mt-8 text-center">
            No stats available
          </p>
        )}
      </div>
    </div>
  );
};

export default Stats;
