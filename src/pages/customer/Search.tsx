import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Search</h1>
      <Input placeholder="Search for services or launderers..." />
      {/* Add search results here */}
    </div>
  );
};

export default Search;
