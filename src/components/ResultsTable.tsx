import { BusinessResult } from "@/types";
import { ExternalLink } from "lucide-react";

interface ResultsTableProps {
  results: BusinessResult[];
  options: {
    includeWebsite: boolean;
    includePhone: boolean;
    includeRating: boolean;
    enrichResults?: boolean;
  };
}

export function ResultsTable({ results, options }: ResultsTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="max-h-[600px] overflow-auto">
        <table className="w-full border-collapse text-left text-sm text-gray-600">
          <thead className="sticky top-0 z-10 border-b border-gray-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th scope="col" className="px-4 py-3 font-semibold text-gray-700 w-12 text-center">
                #
              </th>
              <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                Name
              </th>
              <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                Type
              </th>
              <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                Address
              </th>
              {options.includePhone && (
                <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                  Phone
                </th>
              )}
              {options.includeWebsite && (
                <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                  Website
                </th>
              )}
              {options.includeRating && (
                <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                  Rating
                </th>
              )}
              {options.enrichResults && (
                <>
                  <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                    Instagram
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                    Facebook
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                    WhatsApp
                  </th>
                  <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                    Contact Us
                  </th>
                </>
              )}
              <th scope="col" className="px-6 py-3 font-semibold text-gray-700">
                Maps
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {results.map((biz, index) => (
              <tr key={biz.id} className="hover:bg-indigo-50/30 even:bg-slate-50/40 transition-colors">
                <td className="px-4 py-4 font-medium text-gray-400 text-center w-12">
                  {index + 1}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap">
                  {biz.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {biz.type || "—"}
                </td>
                <td className="px-6 py-4 min-w-[240px] whitespace-normal break-words text-gray-500">
                  {biz.address || "—"}
                </td>
                {options.includePhone && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {biz.phone ? (
                      <a
                        href={`tel:${biz.phone.replace(/[^+\d]/g, "")}`}
                        className="text-black hover:underline font-medium"
                      >
                        {biz.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                )}
                {options.includeWebsite && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    {biz.website ? (
                      <a
                        href={biz.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:underline font-medium truncate max-w-[200px] inline-block"
                        title={biz.website}
                      >
                        {biz.website.replace(/^https?:\/\/(www\.)?/, "")}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                )}
                {options.includeRating && (
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {biz.rating !== undefined ? (
                      <span>
                         {biz.rating.toFixed(1)}
                        {biz.reviews !== undefined && (
                          <span className="text-gray-400 font-normal text-xs ml-1">
                            ({biz.reviews})
                          </span>
                        )}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                )}
                {options.enrichResults && (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {biz.email ? (
                        <a
                          href={`mailto:${biz.email}`}
                          className="text-black hover:underline font-medium"
                        >
                          {biz.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {biz.instagram ? (
                        <a
                          href={biz.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:underline font-medium inline-flex items-center gap-1"
                        >
                          Instagram
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {biz.facebook ? (
                        <a
                          href={biz.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:underline font-medium inline-flex items-center gap-1"
                        >
                          Facebook
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {biz.whatsapp ? (
                        <a
                          href={biz.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:underline font-medium inline-flex items-center gap-1"
                        >
                          WhatsApp
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {biz.contactPage ? (
                        <a
                          href={biz.contactPage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:underline font-medium inline-flex items-center gap-1"
                        >
                          Contact Page
                          <ExternalLink className="h-3 w-3 text-gray-400" />
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </>
                )}
                <td className="px-6 py-4 whitespace-nowrap">
                  {biz.mapsUrl ? (
                    <a
                      href={biz.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-black hover:underline font-medium"
                    >
                      Open
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
