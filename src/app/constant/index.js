import { BotMessageSquare } from "lucide-react";
import { BatteryCharging } from "lucide-react";
import { Fingerprint } from "lucide-react";
import { ShieldHalf } from "lucide-react";
import { PlugZap } from "lucide-react";
import { GlobeLock } from "lucide-react";


export const navItems = [
  { label: "Features", href: "#" },
  { label: "Workflow", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Contact Us", href: "#" },
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "Intuitive Issue Reporting",
    description:
      "Easily report problems in your city, like potholes, broken streetlights, or waste issues, using a user-friendly interface.",
  },
  {
    icon: <Fingerprint />,
    text: "Geolocation Integration",
    description:
      "Automatically pinpoint your complaint’s exact location with built-in geolocation features for accurate municipal response.",
  },
  {
    icon: <ShieldHalf />,
    text: "Categorized Problem Types",
    description:
      "Select from predefined categories of issues for quicker and streamlined complaint lodging.",
  },
  {
    icon: <BatteryCharging />,
    text: "Real-Time Updates",
    description:
      "Stay informed with live updates on the status of your complaint, from submission to resolution.",
  },
  {
    icon: <PlugZap />,
    text: "Municipal Connection",
    description:
      "Directly connect complaints to the respective city municipal councils for faster and efficient action.",
  },
  {
    icon: <GlobeLock />,
    text: "Multilingual Support",
    description:
      "Make your voice heard in multiple languages for inclusivity and greater reach.",
  },
];

export const checklistItems = [
  {
    title: "Report Issues with Ease",
    description:
      "Submit detailed reports of city problems, like potholes or broken lights, using a user-friendly interface.",
  },
  {
    title: "Add Location Details",
    description:
      "Pinpoint the exact location of the issue through integrated geolocation features for precise identification.",
  },
  {
    title: "Connect to Municipal Authorities",
    description:
      "Your complaint is automatically forwarded to the relevant municipal authority for quick resolution.",
  },
  {
    title: "Track Progress in Real Time",
    description:
      "Stay updated on complaint resolution status with live notifications, from acknowledgment to closure.",
  },
];

export const resourcesLinks = [
  { href: "#", text: "How to Report" },
  { href: "#", text: "FAQs" },
  { href: "#", text: "User Guide" },
  { href: "#", text: "Support Center" },
  { href: "#", text: "Contact Us" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Areas" },
  { href: "#", text: "Privacy Policy" },
  { href: "#", text: "Terms of Service" },
  { href: "#", text: "Updates & Announcements" },
];

export const communityLinks = [
  { href: "#", text: "Success Stories" },
  { href: "#", text: "Feedback Forum" },
  { href: "#", text: "Partnerships" },
  { href: "#", text: "Social Media" },
  { href: "#", text: "Volunteer Opportunities" },
];