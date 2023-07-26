import { PageLayout } from "~/components/layout";

export default function Custom404() {
  return (
    <>
      <PageLayout>
        <div className="flex h-full w-full items-center justify-center">
          <h1 className="text-slate900 text-center text-4xl italic">
            404 - Page Not Found
          </h1>
        </div>
      </PageLayout>
    </>
  );
}
