

export interface AboutImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  url: string;
  width: number;
  height: number;
}

export interface GroupedImageIcon {
  id: number;
  desc: string;
  Image: AboutImage;
  imageWidth?: string;
  imageHeight?: string;
  imageRounded?: string;
}

export interface AboutData {
  id: number;
  documentId: string;
  title: string;
  desc: string;
  GroupedImageIcon: GroupedImageIcon[];
}

export const fetchAbout = async (): Promise<AboutData | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/about?populate[GroupedImageIcon][populate]=*`,

    );

    if (!response.ok) {
      throw new Error("Failed to fetch about data");
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching about:", error);
    return null;
  }
};
