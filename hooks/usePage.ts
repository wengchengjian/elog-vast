import { useState } from "react";

export default function usePage() {
  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(5);

  return {
    page, pageSize, setPage, setPageSize
  }
}