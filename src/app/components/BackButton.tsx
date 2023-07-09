"use client";
import Button from "@mui/material/Button";
import { useRouter, usePathname } from "next/navigation";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IconButton from "@mui/material/IconButton";

const BackButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  // console.log(pathname);

  return (
    <>
      {pathname !== "/" && (
        <IconButton
          aria-label="back"
          size="small"
          onClick={() => router.back()}
        >
          <ArrowBackIosIcon fontSize="inherit" className="text-c-accent-1" />
        </IconButton>
      )}
    </>
  );
};

export default BackButton;
