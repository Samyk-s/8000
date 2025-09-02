"use client";

import packageApi from "@/lib/api/packageApi";
import { Package } from "@/types/package";
import { useEffect, useState } from "react";

const usePackages = (limit = 10) => {

  const [packages, setPackages] = useState<Package[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const response = await packageApi.getPackages(limit)
        console.log("res", response)
        setPackages(response.items)
      } catch (error) {

      }
    }
    fetchPackages()
  }, [])
  return { packages, loading, error }
}

export default usePackages