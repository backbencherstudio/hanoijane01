import type { Metadata } from "next";
import { CalendarDays, Clock3, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Programme | ITBA Expo 2027",
  description:
    "Explore the Friday 8 and Saturday 9 January programme for ITBA Expo 2027.",
};

type Session = {
  time: string;
  title: string;
  description?: string;
  moderator?: string;
  speakers?: string;
  expoDen?: boolean;
};

const programme: { day: string; date: string; sessions: Session[] }[] = [
  {
    day: "Friday",
    date: "8 January 2027",
    sessions: [
      {
        time: "9:30",
        title: "Official Opening",
        description: "Official opening from the Minister for Agriculture.",
      },
      {
        time: "10:00–11:30",
        title: "Working Forward: Thoroughbred Industry Employment and Careers in the Coming Decades",
        description: "Skills, recruitment and career pathways.",
        moderator: "Moderator: Joe Osborne",
        speakers:
          "Carol Nolan (HRI), Dr Ciara Losty (South East Technological University), Ado McGuinness (IRTA) and Ruth Flood",
      },
      {
        time: "11:30–12:30",
        title: "Equine Traceability",
        description:
          "Session with Sharon O'Regan of Weatherbys and Rosanne Green from the Department of Agriculture.",
        expoDen: true,
      },
      { time: "12:30–13:00", title: "Lunch & Networking" },
      {
        time: "13:00–14:00",
        title: "Nutrition",
        expoDen: true,
      },
      {
        time: "14:00–15:30",
        title: "The Business of Racing",
        description:
          "A panel discussion on the business of racing, with international betting perspectives.",
        moderator: "Moderator: Mark Boylan",
        speakers:
          "Jonathan Mullin, Russell Ferris, James Ryan and Stephen Kennelly (HKJC)",
      },
      {
        time: "16:00–16:45",
        title: "Finance and Insurance",
        description: "Speakers from NFP, SC Dunne and Howden Insurance.",
        expoDen: true,
      },
      {
        time: "17:15–19:00",
        title: "The Sport of Racing",
        description:
          "The joy and fun of racing, with insights from leading owners, owner-breeders, syndicates and international voices.",
        moderator: "Moderator: Johnny Ward",
        speakers:
          "Rich Ricci, Michael Owen, Johnny Murtagh and Sam Hoskins",
      },
    ],
  },
  {
    day: "Saturday",
    date: "9 January 2027",
    sessions: [
      {
        time: "9:00–10:30",
        title: "Racing & Breeding from the Horses’ Perspective",
        description:
          "Looking at the future of racing and the challenges facing the sector.",
        moderator: "Moderator: Sally Ann Grassick",
        speakers:
          "Eliot Forbes, Meta Osborne, Vicky Leonard, John Osborne and Emma Berry",
      },
      {
        time: "10:30–12:00",
        title: "The Breeders’ Edge: What Successful Flat Breeders Are Doing Differently",
        description:
          "A discussion on the current state and future of Flat breeding.",
        moderator: "Moderator: Bernard Condren",
        speakers:
          "Ed Sackville, Paul McCartan, Brendan Hayes and a Next Generation breeder",
      },
      {
        time: "12:30–13:30",
        title: "Staying Ahead of Parasites",
        description:
          "The Irish perspective on trends, resistance and practical pasture management.",
        speakers: "Kerrie Kavanagh, Wendy Conlon, Nikki Walshe and Sean Keane",
        expoDen: true,
      },
      {
        time: "13:30–14:30",
        title: "Interview with Michael & Ben Swinburn",
      },
      {
        time: "14:30–15:30",
        title: "Sustainable Stud Farming",
        description:
          "Land Management, Equine Welfare & Environmental Challenges",
        moderator: "Moderator: Pippa Hackett",
        speakers: "Alan Creighton, John Tuthill, John Corbett and Des Leadon",
        expoDen: true,
      },
      {
        time: "15:30–17:00",
        title: "National Hunt Breeding: A Modern Approach",
        description: "The current and future model for National Hunt breeding.",
        moderator: "Moderator: Jane Mangan",
        speakers:
          "Peter Molony, Bryan Mayoh, Henry de Bromhead and Noel George",
      },
      {
        time: "17:30–18:30",
        title: "The Next 100: The Future Is in Our Hands",
        description:
          "Perspectives from the next generation of the industry.",
        speakers:
          "Barry Kennedy, Aoife Boland, Ross O’Mahoney, Timmy Love and Orla Hassett",
      },
    ],
  },
];

function SessionCard({ session }: { session: Session }) {
  return (
    <article className="relative rounded-xl border border-primary/25 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <div className="flex shrink-0 items-start sm:w-36">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#e5eaec] px-3 py-2 text-sm font-semibold text-primary">
            <Clock3 aria-hidden="true" className="size-4" />
            {session.time}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            {session.expoDen && (
              <span className="rounded-full bg-[#C25B29]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#A4471E]">
                Weatherbys Marquee Stage
              </span>
            )}
          </div>
          <h3 className="text-xl font-semibold leading-snug text-text-primary sm:text-2xl">
            {session.title}
          </h3>
          {session.description && (
            <p className="mt-2 leading-relaxed text-accent">
              {session.description}
            </p>
          )}
          {(session.moderator || session.speakers) && (
            <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-accent">
              <Users aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {session.moderator && (
                  <>
                    <span className="font-semibold text-text-primary">
                      {session.moderator}
                    </span>
                    {session.speakers ? " — " : ""}
                  </>
                )}
                {session.speakers}
              </span>
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProgrammePage() {
  return (
    <div className="bg-[#FEFAF5]">
      <section className="padding-default-bottom padding-default-top">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C25B29] px-4 py-1.5 font-medium text-[#C25B29]">
              <CalendarDays aria-hidden="true" className="size-4" />
              ITBA Expo 2027
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
              Event Programme
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-accent sm:text-lg">
              Two days of conversations, insight and ideas from across the
              thoroughbred and equine industry.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {programme.map((day, index) => (
                <a
                  key={day.day}
                  href={`#day-${index + 1}`}
                  className="rounded-full border border-primary px-5 py-2.5 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  {day.day}, {day.date}
                </a>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-5xl space-y-14 lg:mt-16">
            {programme.map((day, index) => (
              <section
                key={day.day}
                id={`day-${index + 1}`}
                className="scroll-mt-8"
                aria-labelledby={`day-heading-${index + 1}`}
              >
                <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-primary/20 pb-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#C25B29]">
                      Day {index + 1}
                    </p>
                    <h2
                      id={`day-heading-${index + 1}`}
                      className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl"
                    >
                      {day.day}
                    </h2>
                  </div>
                  <p className="font-medium text-accent">{day.date}</p>
                </div>
                <div className="space-y-4">
                  {day.sessions.map((session) => (
                    <SessionCard key={`${day.day}-${session.time}-${session.title}`} session={session} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
