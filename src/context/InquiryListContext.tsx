import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "kldstone-inquiry-list";

export type InquiryItem = {
  id: string;
  name: string;
  categoryKey: string;
  categoryName: string;
  image: string;
};

type InquiryListContextValue = {
  items: InquiryItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (item: InquiryItem) => void;
  removeItem: (id: string) => void;
  clearItems: () => void;
  hasItem: (id: string) => boolean;
  toggleItem: (item: InquiryItem) => void;
};

const InquiryListContext = createContext<InquiryListContextValue | null>(null);

export function InquiryListProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored) as InquiryItem[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: InquiryItem) => {
    setItems((current) =>
      current.some((existing) => existing.id === item.id) ? current : [...current, item],
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearItems = useCallback(() => setItems([]), []);
  const hasItem = useCallback((id: string) => items.some((item) => item.id === id), [items]);

  const toggleItem = useCallback(
    (item: InquiryItem) => {
      if (hasItem(item.id)) {
        removeItem(item.id);
      } else {
        addItem(item);
        setIsOpen(true);
      }
    },
    [addItem, hasItem, removeItem],
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      setIsOpen,
      addItem,
      removeItem,
      clearItems,
      hasItem,
      toggleItem,
    }),
    [addItem, clearItems, hasItem, isOpen, items, removeItem, toggleItem],
  );

  return <InquiryListContext.Provider value={value}>{children}</InquiryListContext.Provider>;
}

export function useInquiryList() {
  const context = useContext(InquiryListContext);
  if (!context) throw new Error("useInquiryList must be used within InquiryListProvider");
  return context;
}
