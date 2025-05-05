import { useEffect, useState } from "react";
import backend from "../services/backendService"; // ini file yang baru kamu bikin

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await backend.getCourses(); // ambil dari backend ICP
        setCourses(result);
      } catch (error) {
        console.error("Gagal fetch courses dari ICP:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading };
};
